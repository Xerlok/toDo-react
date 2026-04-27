import { useOutletContext } from "react-router-dom";
import styles from './ProjectsList.module.css'

export default function ProjectsList () {
    const { projects, setProjects } = useOutletContext();

    function addProject(e) {
        e.preventDefault();
        const newProjectName = e.target.projectName.value;
        const newProject = { id: 3, projectName: newProjectName, todos: [] };
        setProjects(prev => [...prev, newProject]);
        e.target.projectName.value = '';
    };

    function deleteProject() {
        setProjects([]);
    };

    return (
        <div className={styles["projects-wrapper"]}>
            <form action="" className={styles["projects-form"]} onSubmit={addProject}>
                <input
                    type="text"
                    placeholder="New Project Name"
                    name="projectName"
                    className={styles["projectName"]}
                    maxLength={40}
                />
                <button type="submit" className={styles["new-todo"]}>Add+</button>
            </form>
            <div className={styles["projects-window"]}>
                {projects.map(project => (
                <div key={project.id} className={styles["project-item"]} onClick={deleteProject}>{project.projectName}</div>
                ))}
            </div>
        </div>
    );
}
