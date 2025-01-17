
export function handleError(error: any): Error {
    
    if (error.response) {
      
      console.error("Server Error:", error.response.data);
      return new Error(error.response.data.message || "Server Error");
    } else if (error.request) {
      
      console.error("Network Error:", error.request);
      return new Error("Network Error. Please try again later.");
    } else {
      
      console.error("Error:", error.message);
      return new Error(error.message || "An unexpected error occurred");
    }
  }
  