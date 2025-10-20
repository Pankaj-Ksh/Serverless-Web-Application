import { clearUser, setLoading, setToken, setUser } from "../Reducer/authSlice";
import { clearAllProject, setAllProject, addProject, setCurrentProject } from "../Reducer/projectSlice";
import { apiConnection } from "./API_Connection";
import { authEndPoints, projectsEndPoints } from "./API_Routes";
import { toast } from "react-hot-toast";


const { LOGIN_API, SIGNUP_API } = authEndPoints;

const { GET_PROJECTS_API, DELETE_PROJECT_API , CREATE_PROJECT_API, GET_PROJECT_API, UPDATE_PROJECT_API} = projectsEndPoints;

export function signup(username, name, email, pwd, navigate) {
    return async (dispatch) => {
        const toastID = toast.loading("One Step Away from Creating Account...");
        dispatch(setLoading(true));
        
        try {
            const response = await apiConnection("POST", SIGNUP_API, { username, name, email, pwd });
            
            const data = response?.data?.body
                ? JSON.parse(response.data.body)
                : response?.data;

            if (!data?.success) {
                throw new Error(data?.message || "Signup failed");
            }

            toast.success("SignUp Successful, Check Your Email");
            navigate("/login");

            return ""; 
        } 
        catch (error) {
            console.error("Signup Error:", error);

            const message =
                error?.response?.data?.body
                    ? JSON.parse(error.response.data.body).message
                    : error?.response?.data?.message || error?.message || "Something went wrong";

            toast.error(message);
            navigate("/signup");
            return message;
        } 
        finally {
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }
    };
}



export function login(email, pwd, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnection("POST", LOGIN_API, { email, pwd });

            // --- Parse API Gateway Lambda body if needed ---
            const data = response?.data?.body
                ? JSON.parse(response.data.body)
                : response?.data;

            if (!data?.success) {
                throw new Error(data?.message || "Login failed");
            }

            console.log("API Response:", data);
            toast.success("Login Successful");

            const user = {
                name: data?.userExist?.name || "No Name",
                username: data?.userExist?.username || "No Username",
                email: data?.userExist?.email || "No Email",
                _id: data?.userExist?._id || "No ID",
            };

            dispatch(setUser(user));
            dispatch(setToken(data.token));

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");

            return "";
        } 
        catch (error) {
            console.error("Login error:", error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";

            toast.error(message);
            navigate("/login");
            return message;
        } 
        finally {
            dispatch(setLoading(false));
        }
    };
}



export function getallprojects(userID) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const email = user?.email;
            const response = await apiConnection("GET", `${GET_PROJECTS_API}?userID=${email}`);

            // Parse API Gateway Lambda body
            const data = response?.data?.body ? JSON.parse(response.data.body) : response?.data;

            if (!data?.success) {
                throw new Error(data?.message || "Failed to fetch projects");
            }

            const projects = data?.projects || [];
            dispatch(setAllProject(projects));

            localStorage.setItem('allProjects', JSON.stringify(projects));

        } catch (error) {
            console.log("error is ", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export function deleteproject(projectID, userID) {
    return async (dispatch, getState) => {
        try {
            const response = await apiConnection("DELETE", DELETE_PROJECT_API, { projectID, userID });
            
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            const currentProjects = getState().project.allProject;

            const updatedProjects = currentProjects.filter(project => project._id !== projectID);

            dispatch(setAllProject(updatedProjects));

            toast.success("Project Deleted");
        } 
        catch (error) {
            console.log("deleteProject error:", error);
            toast.error(error.message);
        }    
    }
}


export function logout(navigate){
    return async(dispatch) => {
        dispatch(clearUser());
        dispatch(clearAllProject());

        localStorage.removeItem('token');
        localStorage.removeItem('user');  
        localStorage.removeItem('allProjects'); 
        toast.success("Logout Successful");
        navigate("/login");
    }
}


export function createproject(title, userEmail) {
  return async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user?.email; // this is your userID
      const response = await apiConnection("POST", CREATE_PROJECT_API, {
        title,
        userID: email, // sending email as userID
      });

      // --- Parse API Gateway Lambda response body ---
      const data = response?.data?.body ? JSON.parse(response.data.body) : response?.data;

      if (!data?.success || !data.project) {
        throw new Error(data?.message || "Project creation failed");
      }

      const newProject = data.project;

      dispatch(addProject(newProject));

      const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
      existingProjects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(existingProjects));

      localStorage.setItem(`project_${newProject.projectID}`, JSON.stringify(newProject));
        localStorage.setItem("currentProjectID", newProject.projectID); // <-- add this
    //    console.log(newProject.projectID);
      toast.success("Project created successfully");

      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(error?.message || "Failed to Create Project");
      return null;
    }
  };
}




export function getproject(userID, projectID, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true)); 
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const email = user?.email; // this is your userID

            // Get all projects from localStorage
            const projects = JSON.parse(localStorage.getItem("projects")) || [];
            console.log(email);
            
            // Use projectID from argument or fallback to last project in localStorage
            const currentProjectID = projectID || (projects.length ? projects[projects.length - 1].projectID : null);

            if (!currentProjectID) {
                throw new Error("No project ID available");
            }

            // Find the project in localStorage
            let currentProject = projects.find(p => p.projectID === currentProjectID);
            console.log(currentProject)
            if (!currentProject) {
                // If not found in localStorage, fetch from backend
                const response = await apiConnection("GET", `${GET_PROJECT_API}?userID=${email}&projectID=${currentProject}`);
                const data = response?.data?.body ? JSON.parse(response.data.body) : response?.data;

                if (!data?.success) {
                    throw new Error(data?.message || "Failed to fetch project");
                }

                currentProject = data.project;

                // Save to localStorage for next time
                localStorage.setItem("projects", JSON.stringify([...projects, currentProject]));
                localStorage.setItem(`project_${currentProject.projectID}`, JSON.stringify(currentProject));
            }

            // Dispatch to Redux
            dispatch(setCurrentProject(currentProject));

            return currentProject;
        } catch (error) {
            console.error("Error fetching the project:", error);
            toast.error(error?.message || "Failed to fetch project");
            navigate('/');
            return null;
        } finally {
            dispatch(setLoading(false)); 
        }
    };
}





export function updateproject(userID, projectID, htmlCode, cssCode, jsCode) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnection("PUT", UPDATE_PROJECT_API, { userID, projectID, htmlCode, cssCode, jsCode });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            const updatedProject = response.data.project;

            dispatch(setCurrentProject(updatedProject));

            localStorage.setItem(`project_${projectID}`, JSON.stringify(updatedProject));

            toast.success("Code Saved");
        } 
        catch (error) {
            console.log("Error updating project:", error);
        } 
        finally {
            dispatch(setLoading(false));
        }
    };
}
