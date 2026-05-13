import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import styles from './ProjectsList.module.css'
import { Link } from "react-router-dom";
import makeSlug from "../../utils/makeSlug";
import { addProjectToState, deleteProjectFromState } from "../../utils/toDoHelpers";

export default function ProjectsList () {
    const { state, setState } = useOutletContext();
    const [ projectMenuId, setProjectMenuId ] = useState(null);

    function addProject(e) {
        e.preventDefault();
        const newProjectName = e.target.projectName.value;
        const slug = makeSlug(newProjectName);

        setState(prev => addProjectToState(prev, newProjectName, slug));

        e.target.projectName.value = '';
    };

    function deleteProject(projectId) {
        setState(prev => deleteProjectFromState(prev, projectId));
    };

    function deleteAll() {
        setState({
            projects: {
                byID: {},
                allIDs: []
            },
            todos: {
                byID: {},
                allIDs: []
            }
        })
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
                        <div key={project.id} data-id={project.id} className={styles["project-item"]}>
                            <Link
                                className={styles["project-item-name"]}
                                to={`/projects/${project.id}/${project.slug}`}
                            >{project.projectName}</Link>
                            <button
                                className={styles["project-kebab"]}
                                onClick={() => {
                                    setProjectMenuId(
                                        projectMenuId === project.id 
                                            ? null
                                            : project.id
                                    );
                                }}
                            >kebab</button>

                            {projectMenuId === project.id && (
                                <div className={styles["project-menu"]}>
                                    <button
                                        className={styles["project-delete-btn"]}
                                        onClick={() => {
                                            deleteProject(project.id);
                                            setProjectMenuId(null);
                                        }}
                                    >Delete</button>

                                    <button
                                    className={styles["project-move-btn"]}
                                    onClick={() => {
                                        setProjectMenuId(null);
                                    }}
                                    >Move</button>

                                    <button
                                        className={styles["project-rename-btn"]}
                                        onClick={() => {

                                        }}
                                    >Rename</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button onClick={deleteAll}>Delete all</button>
        </div>
    );
}
