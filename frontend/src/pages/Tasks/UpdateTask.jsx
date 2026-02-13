import React, { useEffect } from "react";
import { useUpdateTaskMutation } from "../../redux/api/taskApiSlice";
import { LiaEdit } from "react-icons/lia";
import { toast } from "react-toastify";
import { useState } from "react";
import { useGetAllCatQuery } from "../../redux/api/categoryApiSlice";

const UpdateTask = ({ id, task }) => {
  console.log(task, id);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(task?.name || "");
  const [dueDate, setDuedate] = useState(task?.dueDate || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [status, setStatus] = useState(task?.status || "");
  const [category, setCategory] = useState(task?.category || "");

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setDuedate(task.dueDate || "");
      setDescription(task.description || "");
      setPriority(task.priority || "");
      setStatus(task.status || "");
      setCategory(task.category || "");
    }
  }, [task]);

  const { data: allCats = [] } = useGetAllCatQuery();
  const [updateTask] = useUpdateTaskMutation();

  const handleUpdate = async () => {
    try {
      const updatedTask = await updateTask({
        id,
        updateTask: {
          name,
          description,
          category,
          dueDate,
          status,
          priority,
        },
      }).unwrap();
      toast.success(`Task ${updatedTask.name} is updated`);
      setUpdate(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // console.log("updated task name:", name);

  return (
    <div>
      <LiaEdit
        className="bg-[#FF5C5C] rounded-md text-white"
        size={34}
        onClick={() => {
          setUpdate(true);
        }}
      />

      {update && (
        <div
          className="bg-black/50 fixed flex items-center justify-center w-full h-full bg-black/80  z-[1001] top-0 left-0 "
          onClick={() => setUpdate(false)}
        >
          <div
            className="ml-65 w-[50rem] mr-3 border border-gray-500 rounded-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="font-bold ml-4 my-1 text-lg underline decoration-2 decoration-red-500 underline-offset-3">
              Update Task
            </h1>
            <form className="ml-4">
              <div className="flex flex-col my-1">
                <label htmlFor="name" className="font-semibold ">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[75%] p-2 border border-gray-400 rounded-md mt-1"
                />
              </div>

              <div className="flex  my-6 justify-between w-[75%] ">
                <div className="flex border border-gray-400 p-2 rounded-md">
                  <label htmlFor="priority" className="font-semibold mr-3 ">
                    Priority:
                  </label>
                  <select
                    name="priority"
                    id=""
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="">Choose Priority</option>
                    <option value="Extreme">Extreme</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="flex border border-gray-400 p-2 rounded-md">
                  <label htmlFor="status" className="font-semibold mr-3  ">
                    Status:
                  </label>
                  <select
                    name="status"
                    id=""
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Choose Status</option>
                    <option value="Complete">Complete</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>
              </div>

              <div className="my-2 border border-gray-400 p-2 w-[75%] rounded-md">
                <label htmlFor="duedate" className="font-semibold mr-3 ">
                  Due At:
                </label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDuedate(e.target.value)}
                />
              </div>

              <div className="my-2 flex flex-col">
                <label htmlFor="description" className="font-semibold mr-3">
                  Task Description:
                </label>
                <textarea
                  type="datetime-local"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[75%] border border-gray-400 rounded-md my-1"
                ></textarea>
              </div>

              <div className="my-2">
                <select
                  className="border border-gray-400 p-2 rounded-md w-[40%]"
                  name="category"
                  id=""
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>--Choose Category--</option>
                  {allCats?.length > 0 &&
                    allCats.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat?.name}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="button"
                className="bg-[#FF5C5C] text-white py-3 px-8 border-none rounded-lg hover:outline-2 hover:outline-[#FF5C5C] hover:outline-offset-2 mb-4 font-semibold"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;
