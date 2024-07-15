import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IBlog } from "../../interfaces/IBlog";
import { useNavigate } from "react-router-dom";
import UploadCoudiary from "../../utils/Cloudiary";
import { toast } from "react-toastify";
import toSlug from "../../utils/Slug";
import instans from "../../utils/Axios";
const BlogWrite = () => {
  const [content, setContent] = useState("");
  const [watctchContent, setwatchContent] = useState("");
  const [blog, setBlog] = useState({} as IBlog);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [watchblog, setWatchBlog] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setWatchBlog(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const nav = useNavigate();

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  const handleEditorChange = (value: any) => {
    setContent(value);
  };
  const handleSave = async (e: string) => {
    if (!content) {
      toast.error("Please provide a content");
      return;
    }
    // Xem trước bài viết
    if (e == "watch") {
      setWatchBlog((prevLogin) => !prevLogin);
      setwatchContent(content);
    } else if (e == "save") {
      if (!title) {
        toast.error("Please provide a title");
        return;
      }
      // Upload ảnh tiêu đề
      const imageUp = await UploadCoudiary(image);
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const images = doc.querySelectorAll("img");
      const imageUploadPromises = Array.from(images).map(async (img) => {
        const src = img.getAttribute("src");
        if (src) {
          const response = await fetch(src);
          const blob = await response.blob();
          const formData = new FormData();
          formData.append("file", blob);
          formData.append("upload_preset", "blog_cousse");
          const uploadResponse = await fetch(
            "https://api.cloudinary.com/v1_1/drz5kdrm5/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const uploadData = await uploadResponse.json();
          return { originalSrc: src, newSrc: uploadData.secure_url };
        }
        return null;
      });

      const uploadedImages = await Promise.all(imageUploadPromises);
      let updatedContent = content;

      uploadedImages.forEach((img) => {
        if (img) {
          updatedContent = updatedContent.replace(img.originalSrc, img.newSrc);
        }
      });
      if (JSON.stringify(sessionStorage.getItem("user"))) {
        setBlog({
          title: title,
          slug: toSlug(title),
          authorId: JSON.parse(sessionStorage.getItem("user") as string)._id,
          like: 0,
          content: updatedContent,
          status: true,
          image_url: imageUp,
        });
      }
    }
  };
  if (blog) {
    useEffect(() => {
      // (async () => {
      //   const { data } = await instans.post("/blog", blog);
      //   if (data) {
      //     toast.success("Added blog successfully");
      //     nav("/blog");
      //   }
      // })();
      fetch("http://localhost:3000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Thêm bài viết thành công");
          }
        });
    }, [blog]);
  }

  return (
    <div className="write-blog container3">
      <div className="write-blog-content">
        <div className="write-blog-chid">
          <div className="blog-write-title">
            <h3>Viết Blog</h3>
          </div>
          <div className="blog-publish">
            <button
              className="button-blue"
              onClick={() => handleSave("watch")}
              type="button"
            >
              Xem trước
            </button>
            <button
              className="button-orange"
              onClick={() => handleSave("save")}
              type="button"
            >
              Lưu bài viết
            </button>
          </div>
        </div>
        <div>
          <div>
            <input
              className="title-blog-write-title"
              type="text"
              placeholder="Tiêu đề bài viết ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="file-upload">
            <label htmlFor="blog-file">Ảnh tiêu đề</label>
            <input
              type="file"
              id="blog-file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {image && <img src={image} alt="Uploaded Preview" />}
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleEditorChange}
          modules={module}
        />
      </div>
      {/* Xem trước bài viết */}
      {watchblog && (
        <section ref={popupRef} className="popup-watch-blog">
          <div dangerouslySetInnerHTML={{ __html: watctchContent }} />
          <style>{`
            img {
              max-width: 100%;
              height: auto;
              border: 2px solid #ccc;
              border-radius: 10px;
            }
          `}</style>
        </section>
      )}
    </div>
  );
};

export default BlogWrite;
