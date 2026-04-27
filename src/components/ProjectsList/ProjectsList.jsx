import { useOutletContext } from "react-router-dom";
import styles from './ProjectsList.module.css'

export default function ProjectsList () {
    const { projects } = useOutletContext();

    return (
        <div className={styles["projects-wrapper"]}>
            <form action="" className={styles["projects-form"]}>
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
                <div key={project.id} className={styles["project-item"]}>{project.projectName}</div>
                ))}
            </div>
        </div>
    );
}
