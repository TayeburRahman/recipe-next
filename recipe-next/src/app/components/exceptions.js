  

export class FetchingApiError extends Error{

  constructor(message = "Server error: Network response was not ok")
  {
    super(message);
    this.name = "FetchingApiError";

  }
}
 
   
