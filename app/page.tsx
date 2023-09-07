import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions"
import ProjectCard from "./components/ProjectCard";

type ProjectSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: boolean;
      endCursor: boolean;
    }
  }
};

const Home = async () => {
  const projects = await fetchAllProjects('Full-Stack') as ProjectSearch;

  const projectsToDisplay = projects?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      
      <section className="projects-grid">
        {projectsToDisplay.map(
          ({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
          )
        )}
      </section>

      <h1>Load More</h1>
    </section>
  )
};

export default Home;
