import { useOutletContext } from "react-router-dom";
import styles from './ProjectsList.module.css'
import { Link } from "react-router-dom";

export default function ProjectsList () {
    const { state, setState } = useOutletContext();

    function addProject(e) {
        e.preventDefault();
        const newProjectName = e.target.projectName.value;
        const slug = makeSlug(newProjectName);
        const id = crypto.randomUUID();

        setState(prev => ({
            ...prev,
            projects: {
                ...prev.projects,
                byID: {
                    ...prev.projects.byID,
                    [id]: {
                        id: id,
                        projectName: newProjectName,
                        slug: slug,
                        todoIDs: []
                    }
                },
                allIDs: [...prev.projects.allIDs, id]
            }
        }));

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

    function makeSlug(slug) {
        return slug
            .toLowerCase()
            .trim()
            // normalize accented characters (é → e, ü → u, etc.)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            // remove anything that is not letter, number, space or hyphen
            .replace(/[^a-z0-9\s-]/g, "")
            // replace multiple spaces or hyphens with single hyphen
            .replace(/[\s-]+/g, "-")
            // remove leading/trailing hyphens
            .replace(/^-+|-+$/g, "");
    }

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
