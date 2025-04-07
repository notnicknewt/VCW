// Local storage service for projects
export const saveProjects = (projects: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vcw_projects", JSON.stringify(projects));
  }
};

export const loadProjects = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("vcw_projects");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const saveCurrentProject = (projectId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vcw_current_project", projectId);
  }
};

export const loadCurrentProject = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("vcw_current_project");
  }
  return null;
};
