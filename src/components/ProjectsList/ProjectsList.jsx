import { useOutletContext } from "react-router-dom";
import styles from './ProjectsList.module.css'
import { Link } from "react-router-dom";
import makeSlug from "../../utils/makeSlug";
import { addProjectToState } from "../../utils/toDoHelpers";

export default function ProjectsList () {
    const { state, setState } = useOutletContext();

    function addProject(e) {
        e.preventDefault();
        const newProjectName = e.target.projectName.value;
        const slug = makeSlug(newProjectName);

        setState(prev => addProjectToState(prev, newProjectName, slug));

        e.target.projectName.value = '';
    };

    function deleteProject() {
        setState(prev => ({
            projects: {
                byID: {},
                allIDs: []
            },
            todos: {
                byID: {},
                allIDs: []
            }
            // ...prev,
            // projects: {
            //     byID: {},
            //     allIDs: []
            // }
        }));
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
                <button type="submit" className={styles["new-project"]}>Add+</button>
            </form>
            <div className={styles["projects-window"]}>
                {state.projects.allIDs.map(projectID => {
                    const project = state.projects.byID[projectID];
                    
                    return (
                        <Link key={projectID} to={`/projects/${project.id}/${project.slug}`}>
                            <div key={project.id} data-id={project.id} className={styles["project-item"]}>{project.projectName}</div>
                        </Link>
                    );
                })}
            </div>
            <button onClick={deleteProject}>Delete all</button>
        </div>
    );
}
