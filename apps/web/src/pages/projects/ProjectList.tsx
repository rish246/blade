import { useProjects } from "../../api/queries/projects";

const ProjectList = () => {
    const { data, isLoading, isError } = useProjects();

    return (
        <div>
            {isLoading && "Loading..."}
            {isError && "Error..."}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ProjectList;
