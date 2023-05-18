import React, { useState } from "react";

const Login: React.FC = () => {
  const [key, setKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const handleLogin = () => {
    // Fazer a requisição à API
    const fetchData = async () => {
      const url = "https://v3.football.api-sports.io/status";

      const headers = new Headers();
      headers.append("x-rapidapi-key", key);
      headers.append("x-rapidapi-host", "v3.football.api-sports.io");

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        setLoggedIn(false);
        setErrorMessage("Chave inválida. Por favor, tente novamente.");
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <div>
      {loggedIn ? (
        <h2>Usuário logado!</h2>
      ) : (
        <div>
          <h2>Tela de Login</h2>
          <input type="text" value={key} onChange={handleInputChange} />
          <button onClick={handleLogin}>Entrar</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
