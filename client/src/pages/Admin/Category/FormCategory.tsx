import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../../interfaces/ICategory";
import { useContext, useEffect } from "react";
import toSlug from "../../../utils/Slug";
import { toast } from "react-toastify";
import { CategoryContext } from "../../../contexts/CategoryProvider";

export default function FormCategory() {
  const { dispatchCategoty } = useContext(CategoryContext);
  const nav = useNavigate();
  const { id } = useParams();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ICategory>();
  if (id) {
    useEffect(() => {
      (async () => {
        const ressult = await fetch(`http://localhost:3000/api/category/` + id);
        const data = await ressult.json();
        reset(data.data);
      })();
    }, [id]);
  }
  const onSubmit = async (data: ICategory) => {
    data = { ...data, slug: toSlug(data.name) };
    if (id) {
      try {
        const ressult = await fetch(
          `http://localhost:3000/api/category/` + id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const newdata = await ressult.json();
        if (newdata.data) {
          toast.success("Update Category Successfully");
          dispatchCategoty({
            type: "UPDATE_CATEGORY",
            payload: newdata.data,
          });
          nav("/admin/category");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const ressult = await fetch(`http://localhost:3000/api/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newdata = await ressult.json();
        if (newdata.data) {
          toast.success("Add Category Successfully");
          dispatchCategoty({
            type: "ADD_CATEGORY",
            payload: newdata.data,
          });
          nav("/admin/category");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="form-course">
        <h2>{id ? "Update Category" : "Add Category"}</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="name-category">
            <label htmlFor="">Name Category</label>
            <input
              type="text"
              {...register("name", {
                required: "Category name cannot be empty",
                minLength: {
                  value: 6,
                  message: "Category name is greater than 6 characters",
                },
              })}
              placeholder="Name category"
            />
          </div>
          <div className="option-category">
            <label htmlFor="">Option Category</label>
            <select {...register("isHidden")}>
              <option value="false">Ẩn</option>
              <option value="true">Hiện</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
