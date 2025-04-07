import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContentIdea {
  text: string;
  audience: string;
  goal: string;
  analysis?: any;
}

interface Project {
  id: string;
  title: string;
  contentIdea?: ContentIdea;
  createdAt: number;
  updatedAt: number;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Load projects from localStorage
const loadProjects = (): Project[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const storedProjects = localStorage.getItem("vcw_projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  } catch (error) {
    console.error("Failed to load projects from localStorage:", error);
    return [];
  }
};

// Save projects to localStorage
const saveProjects = (projects: Project[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("vcw_projects", JSON.stringify(projects));
};

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
    // Initialize projects from localStorage
    initializeProjects: (state) => {
      state.projects = loadProjects();
    },
    
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
      
      // Save to localStorage
      saveProjects(state.projects);
    },
    
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
      }
    },
    
    saveContentIdea: (state, action: PayloadAction<{ 
      text: string; 
      audience: string; 
      goal: string;
      analysis?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const updatedProject = {
        ...state.currentProject,
        contentIdea: action.payload,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
        
        // Save to localStorage
        saveProjects(state.projects);
      }
    },
    
    // Loading states
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
  initializeProjects,
  createProject,
  setCurrentProject,
  saveContentIdea,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;