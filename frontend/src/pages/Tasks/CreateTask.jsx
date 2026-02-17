import React from "react";
import { toast } from "react-toastify";
import { useCreateTaskMutation } from "../../redux/api/taskApiSlice";
import { Link } from "react-router-dom";
import { useGetAllCategorysQuery } from "../../redux/api/categoryApiSlice";
import { useGetAllCatQuery } from "../../redux/api/categoryApiSlice";
import { useState } from "react";
import { useEffect } from "react";

const CreateTask = () => {
  const [name, setName] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const { data: allCats = [] } = useGetAllCatQuery();
  console.log("this is allcats from create tasks", allCats);

  // useEffect(() => {
  //   console.log(name, dueDate, category, priority, status, description);
  // }, [name, dueDate, category, priority, status, description]);

  const [createTask] = useCreateTaskMutation();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const task = await createTask({
        name,
        description,
        category,
        dueDate,
        status,
        priority,
      }).unwrap();
      toast.success(`${task.name} task is created`);
    } catch (error) {
      toast.error(error?.message || error?.error);
    }
  };

  return (
    <>
      {allCats?.length > 0 ? (
        <div className="ml-4 md:ml-65 w-[23rem] md:w-[64rem]  mr-3 border border-gray-500 rounded-lg ">
          <h1 className="font-bold ml-4 my-1 text-lg underline decoration-2 decoration-red-500 underline-offset-3">
            Create Task
          </h1>
          <form className="ml-4" onSubmit={(e) => handleCreateTask(e)}>
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

            <div className="md:flex flex flex-wrap  my-6 justify-between w-[75%] ">
              <div className="flex my-1 border border-gray-400 p-2 rounded-md">
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
                <option value="">--Choose Category--</option>
                {allCats?.length > 0 &&
                  allCats.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat?.name}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#FF5C5C] text-white py-3 px-8 border-none rounded-lg hover:outline-2 hover:outline-[#FF5C5C] hover:outline-offset-2 mb-4 font-semibold"
            >
              Create
            </button>
          </form>
        </div>
      ) : (
        <div className="ml-65 ">
          {" "}
          You have to create a create category first...
          <Link
            to={`/category`}
            className="text-lg text-[#FF5C5C} font-semibold underline decoration-2 decoration-[#FF5C5C] underline-offset-2 "
          >
            Create Category
          </Link>
        </div>
      )}
    </>
  );
};

export default CreateTask;
