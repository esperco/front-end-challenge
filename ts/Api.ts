namespace Api {

  const prefix = "http://localhost:3000/";

  // Makes a JSON HTTP requests, returns a jqXHR promise
  function request({ method, path, data }: {
    method: string;
    path: string;
    data?: any
  }) {
    var request = {
      url: prefix + path,
      type: method,
      data: data ? JSON.stringify(data) : "",
      contentType: "application/json; charset=UTF-8",
      dataType: "json" // type of the data expected from the server
    };
    return $.ajax(request);
  }

  function get(path: string) {
    return request({ method: "GET", path: path });
  }


  ///////

  export interface Time {
    time: number; // Unix Timestamp
  }

  // Current Unix timestamp on server
  export function getNow(): JQueryPromise<Time> {
    return get("now");
  }
}
