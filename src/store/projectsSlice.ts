import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for our state
interface ContentIdea {
  id: string;
  title: string;
  contentIdea: string;
  targetAudience: string;
  contentGoal: string;
  analysis?: any;
  createdAt: number;
  updatedAt: number;
}

interface Hook {
  id: string;
  contentIdeaId: string;
  hookType: string;
  selectedHook?: string;
  generatedHooks?: any;
  createdAt: number;
  updatedAt: number;
}

interface ContentStructure {
  id: string;
  contentIdeaId: string;
  hook: string;
  middle: string;
  ending: string;
  contentType: string;
  analysis?: any;
  createdAt: number;
  updatedAt: number;
}

interface Caption {
  id: string;
  contentIdeaId: string;
  contentSummary: string;
  keyPoints: string[];
  captionStyle: string;
  ctaType: string;
  contentNiche: string;
  selectedCaption?: string;
  generatedCaptions?: any;
  createdAt: number;
  updatedAt: number;
}

interface Performance {
  id: string;
  contentIdeaId: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    watchTime: number;
    followersGained: number;
    profileVisits: number;
  };
  contentCategory: string;
  platform: string;
  timeFrame: string;
  analysis?: any;
  createdAt: number;
  updatedAt: number;
}

interface Project {
  id: string;
  title: string;
  contentIdea?: ContentIdea;
  hook?: Hook;
  contentStructure?: ContentStructure;
  caption?: Caption;
  performance?: Performance;
  createdAt: number;
  updatedAt: number;
  userId?: string;
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
  name: 'projects',
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
    },
    
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
      }
    },
    
    updateProject: (state, action: PayloadAction<Partial<Project>>) => {
      if (!state.currentProject) return;
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
          updatedAt: Date.now(),
        };
        state.currentProject = state.projects[index];
      }
    },
    
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      if (state.currentProject?.id === action.payload) {
        state.currentProject = null;
      }
    },
    
    // Content idea
    saveContentIdea: (state, action: PayloadAction<{
      contentIdea: string;
      targetAudience: string;
      contentGoal: string;
      analysis?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const contentIdea: ContentIdea = {
        id: Date.now().toString(),
        title: state.currentProject.title,
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        contentIdea,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
      }
    },
    
    // Hook
    saveHook: (state, action: PayloadAction<{
      hookType: string;
      selectedHook?: string;
      generatedHooks?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const hook: Hook = {
        id: Date.now().toString(),
        contentIdeaId: state.currentProject.contentIdea?.id || '',
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        hook,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
      }
    },
    
    // Content structure
    saveContentStructure: (state, action: PayloadAction<{
      hook: string;
      middle: string;
      ending: string;
      contentType: string;
      analysis?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const contentStructure: ContentStructure = {
        id: Date.now().toString(),
        contentIdeaId: state.currentProject.contentIdea?.id || '',
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        contentStructure,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
      }
    },
    
    // Caption
    saveCaption: (state, action: PayloadAction<{
      contentSummary: string;
      keyPoints: string[];
      captionStyle: string;
      ctaType: string;
      contentNiche: string;
      selectedCaption?: string;
      generatedCaptions?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const caption: Caption = {
        id: Date.now().toString(),
        contentIdeaId: state.currentProject.contentIdea?.id || '',
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        caption,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
      }
    },
    
    // Performance
    savePerformance: (state, action: PayloadAction<{
      metrics: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
        saves: number;
        watchTime: number;
        followersGained: number;
        profileVisits: number;
      };
      contentCategory: string;
      platform: string;
      timeFrame: string;
      analysis?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const performance: Performance = {
        id: Date.now().toString(),
        contentIdeaId: state.currentProject.contentIdea?.id || '',
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        performance,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
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
  createProject,
  setCurrentProject,
  updateProject,
  deleteProject,
  saveContentIdea,
  saveHook,
  saveContentStructure,
  saveCaption,
  savePerformance,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
