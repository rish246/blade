import { useProjects } from "../../api/queries/projects";

const ProjectList = () => {
    const { data, isLoading, error, isError } = useProjects();
    if (isError) {
        console.log(error.message);
    }
    return (
        <div>
            {isLoading && "Loading..."}
            {isError && error.message}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ProjectList;
