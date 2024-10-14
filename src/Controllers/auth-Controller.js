

export  const register = async (req, res) => {
  try {
    res.send("Register Route is Activated is Running");
  } 
  catch (error) {
    res.status(501).send({
      message: "Server Error",
      error: error,
    });
  }
}


export const login = async (req, res) => {
    try {
      res.send("login Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }

  

  export const logout = async (req, res) => {
    try {
      res.send("logout Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }

  

  export const stup2FaAuth = async (req, res) => {
    try {
      res.send("stup2FaAuth Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }

  

  export const verfy = async (req, res) => {
    try {
      res.send("verfy Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }

  

  export const reset2Fa = async (req, res) => {
    try {
       res.send("reset2Fa Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }

  
  export const authStatus = async (req, res) => {
    try {
      res.send("authStatus Route is Activated is Running");
    } 
    catch (error) {
      res.status(501).send({
        message: "Server Error",
        error: error,
      });
    }
  }
  
