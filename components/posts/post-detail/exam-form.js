import Image from "next/image";

//import classes from "./title.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/client";
function ExamForm(props) {
  //const linkPath = `/posts/questions/${props.post.id}/`;
  const [session, loading] = useSession();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [examNo, setExamNo] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [pathValue, setPathValue] = useState("");

  const router = useRouter();
  //router.push(linkPathForUpdate);
  // const router = useRouter();
  //  const handleUpdateData = () => {
  //    console.log("from handle update");
  //    notificationCtx.blogUpdateHandler({
  //      post,
  //      idValue: post.id,
  //    });
  //    router.push(linkPathForUpdate);
  //  };
  console.log({ pathValue });
  function handleSubmit(event) {
    event.preventDefault();

    if (getSelectedSubjects().length > 2) {
      console.log("Not more than two subJEcts IS aloWed");
      return;
    }

    if (getSelectedSubjects().length < 1) {
      console.log("no subject selected");
      return;
    }

    router.push(pathValue);
  }
  useEffect(() => {
    if (session) {
      setName(session.user.name.name);
      setUserName(session.user.name.username);
      //setExamNo()
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      setExamNo("");
    }
  }, [name, username]);

  useEffect(() => {
    if (session) {
      setPathValue(
        `/posts/questions/${props.post.id}/${getSelectedSubjects().join("/")}`
      );
    }
  }, [selectedSubjects]);

  function handleCheckBoxChange(e) {
    // const { name, value, checked } = e.target;
    const name = e.target.name;
    const checkedValue = e.target.checked;
    // if (checkedValue) {
    setSelectedSubjects({ ...selectedSubjects, [name]: checkedValue });
    // }
    // console.log({ name, value, checked });
  }
  function getSelectedSubjects() {
    const subjectArray = [];
    for (const key in selectedSubjects) {
      if (Object.hasOwnProperty.call(selectedSubjects, key)) {
        const subject = selectedSubjects[key];
        if (subject) {
          subjectArray.push(key);
        }
      }
    }
    return subjectArray;
  }

  return (
    <section
      style={{
        position: "absolute",
        top: "5%",
        left: "10%",
        zIndex: "10",
        width: "70%",
        borderRadius: "5px",
      }}
    >
      <div class="row text-center justify-content-center align-items-center bg-warning">
        <div class="d-flex">
          <img
            // className={classes["post-image"]}
            src={session.user.image.imageUrl}
            class="rounded-circle mb-3 mr-3 img-fluid w-50"
            alt="card image"
          />
          <div>
            <h5 class="display-5 ">Registration Form</h5>
            <p class="lead">
              Fill out this form and click the submit button to begin the exam.
            </p>
          </div>
        </div>

        <div class="col-12">
          <div class="card m-3">
            <div class="card-body text-center">
              <form onSubmit={handleSubmit}>
                <fieldset class="border p-2">
                  <legend class="float-none w-auto p-2">Personal Info:</legend>
                  <div class="mb-3">
                    <label htmlFor="inputUsername" class="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputUsername"
                      aria-describedby="emailHelp"
                      value={username}
                    />
                  </div>
                  <div class="mb-3">
                    <label htmlFor="inputName" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputName"
                      value={name}
                    />
                  </div>
                  <div class="mb-3">
                    <label htmlFor="inputExamNo" class="form-label">
                      Exam Number
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputExamNo"
                      value={examNo}
                    />
                  </div>
                </fieldset>

                <fieldset class="border border-2 p-2">
                  <legend class="float-none w-auto p-2">
                    Select subject(s):
                  </legend>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck1"
                      onChange={handleCheckBoxChange}
                      name="mathematics"
                    />
                    <label class="form-check-label" htmlFor="exampleCheck1">
                      MathematicS
                    </label>
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck2"
                      onChange={handleCheckBoxChange}
                      name="chemistry"
                    />
                    <label class="form-check-label" htmlFor="exampleCheck2">
                      Chemistry
                    </label>
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck3"
                      onChange={handleCheckBoxChange}
                      name="physics"
                    />
                    <label class="form-check-label" htmlFor="exampleCheck3">
                      Physics
                    </label>
                  </div>
                </fieldset>
                <div className="d-flex">
                  <button type="submit" class="btn btn-primary me-2">
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={() => props.setexamFormIsOpen(false)}
                    class="btn btn-primary"
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExamForm;
//C:\Users\DEL\Desktop\web-development\acade-blog\public\images\site\home-page
