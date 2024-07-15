import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import toSlug from "../../../utils/Slug";
import { toast } from "react-toastify";
import { CourseContext } from "../../../contexts/CourseProvider";
import ICousrse from "../../../interfaces/ICousrse";
import { ICategory } from "../../../interfaces/ICategory";
import UploadCoudiary from "../../../utils/Cloudiary";
import instans from "../../../utils/Axios";

export default function FormCourse() {
  const { dispatchCourses } = useContext(CourseContext);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [thumbnailOption, setThumbnailOption] = useState("keep");
  const [category, setCategory] = useState<ICategory[]>([]);
  const [defaultCategoryId, setDefaultCategoryId] = useState("");
  const [localImagePreview, setLocalImagePreview] = useState(null);

  const nav = useNavigate();
  const { id } = useParams();
  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<ICousrse>();

  useEffect(() => {
    (async () => {
      // const result = await fetch("http://localhost:3000/api/category");
      const { data } = await instans.get(`/category`);
      // const data = await result.json();
      if (data) {
        setCategory(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        // const result = await fetch(`http://localhost:3000/api/courses/` + id);
        const { data } = await instans.get(`/category/${id}`);
        // const data = await result.json();
        if (data.data) {
          reset(data.data);
          setThumbnailUrl(data.data.image);
          setDefaultCategoryId(data.data.categoryId._id);
          setValue("categoryId", data.data.categoryId._id);
        }
      })();
    }
  }, [id, reset, setValue]);

  const onSubmit = async (data: ICousrse) => {
    data = { ...data, slug: toSlug(data.title) };
    let updatedProduct = { ...data };

    switch (thumbnailOption) {
      case "upload":
        if (data.image && data.image[0]) {
          console.log(data.image);
          const thumbnailUrl = await UploadCoudiary(data.image[0]);
          console.log(thumbnailUrl);
          updatedProduct = { ...updatedProduct, image: thumbnailUrl };
        }
        break;
      default:
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:3000/api/courses/${id}`
        : "http://localhost:3000/api/courses";
      const result = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const newdata = await result.json();

      if (newdata.data) {
        toast.success(
          id ? "Update Course Successfully" : "Add Course Successfully"
        );
        dispatchCourses({
          type: id ? "UPDATE_COURSE" : "ADD_COURSE",
          payload: newdata.data,
        });
        nav("/admin/course");
      } else {
        toast.error("Failed to add or update course");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding or updating the course");
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setLocalImagePreview(URL.createObjectURL(file) as any);
    }
  };

  return (
    <div className="form-course">
      <h2>{id ? "Edit Course" : "Add Course"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title-select-course">
          <div className="title-course">
            <label>Title Course</label>
            <input
              type="text"
              {...register("title", {
                required: "Course title cannot be empty",
                minLength: {
                  value: 6,
                  message: "Course title must be greater than 6 characters",
                },
              })}
              placeholder="Title course"
            />
            {errors.title && (
              <p className="form-errors">{errors.title.message}</p>
            )}
          </div>

          <div className="select-course">
            <label>Select Category</label>
            <select
              {...register("categoryId")}
              defaultValue={defaultCategoryId}
            >
              {category.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="course-form-price">
          <div className="course-cornerprice">
            <label>Cornerprice Course</label>
            <input
              type="number"
              {...register("cornerprice", {
                required: "Course cornerprice cannot be empty",
                min: {
                  value: 1000,
                  message: "Course cornerprice must be greater than 1000",
                },
              })}
              placeholder="Cornerprice course"
            />
            {errors.cornerprice && (
              <p className="form-errors">{errors.cornerprice.message}</p>
            )}
          </div>
          <div className="course-discount">
            <label>Discount Course</label>
            <input
              type="number"
              {...register("discount", {
                required: "Course discount cannot be empty",
                min: {
                  value: 1000,
                  message: "Course discount must be greater than 1000",
                },
              })}
              placeholder="Discount course"
            />
            {errors.discount && (
              <p className="form-errors">{errors.discount.message}</p>
            )}
          </div>
        </div>
        <div className="form-course-des">
          <div className="course-des">
            <label>Description Course</label>
            <textarea
              {...register("description", {
                required: "Course description cannot be empty",
                minLength: {
                  value: 10,
                  message:
                    "Course description must be greater than 10 characters",
                },
              })}
              placeholder="Description course"
            ></textarea>
            {errors.description && (
              <p className="form-errors">{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="status-image">
          <div className="status-form">
            <label>Option Course</label>
            <select {...register("status")}>
              <option value="false">Ẩn</option>
              <option value="true">Hiện</option>
            </select>
          </div>
          <div className="form-course-image">
            <div className="form-course-image-option">
              <label htmlFor="thumbnailOption" className="form-label">
                Tùy chọn upload ảnh
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="thumbnailOption"
                value={thumbnailOption}
                onChange={(e) => setThumbnailOption(e.target.value)}
              >
                <option value="keep">Giữ nguyên ảnh</option>
                <option value="link">Đường dẫn ảnh</option>
                <option value="upload">Upload từ local</option>
              </select>
            </div>
            <div className="form-course-image-up">
              <div>
                <label htmlFor="thumbnail" className="">
                  Ảnh
                </label>
                {thumbnailOption === "link" && (
                  <input
                    type="text"
                    placeholder="Image Link"
                    className="image-course-link"
                    id="thumbnail"
                    {...register("image")}
                  />
                )}
                {thumbnailOption === "upload" && (
                  <div>
                    {/* <label htmlFor="thumbnail" className="upload-image-course">
                      <i className="fa-solid fa-file-arrow-up"></i>
                      <p>Image Course</p>
                    </label> */}
                    <input
                      type="file"
                      id="thumbnail"
                      {...register("image", { required: true })}
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              {localImagePreview && (
                <img
                  src={localImagePreview}
                  alt="Local Image Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
              {thumbnailUrl && thumbnailOption === "keep" && (
                <img
                  src={thumbnailUrl}
                  alt="Product Thumbnail"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
