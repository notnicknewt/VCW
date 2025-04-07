import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper functions for localStorage
const saveProjects = (projects: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vcw_projects", JSON.stringify(projects));
  }
};

const loadProjects = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("vcw_projects");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

interface Project {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Create slice
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Project management
    createProject: (state, action: PayloadAction<{ title: string }>) => {
      const newProject: Project = {
        id: Date.now().toString(),
        title: action.payload.title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.projects.push(newProject);
      state.currentProject = newProject;
      
      // Save to local storage
      saveProjects(state.projects);
    },
    
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
      }
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  createProject,
  setCurrentProject,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;