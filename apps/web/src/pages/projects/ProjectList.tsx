import { Card, Stack, Text } from "@blade/ui";
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
            {data && (
                <Stack direction="column" gap="40px">
                    {data.map((item) => {
                        return (
                            <Card borderRadius="lg" fullWidth>
                                <Text as="h2">{item.title}</Text>
                                <Text>{item.description}</Text>
                            </Card>
                        );
                    })}
                </Stack>
            )}
        </div>
    );
};

export default ProjectList;
