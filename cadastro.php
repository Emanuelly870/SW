<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$database = "cadastro_usuarios";
$conn = new mysqli($servername, $username, $password, $database);
// Verifica conexão
if ($conn->connect_error) {
die("Falha na conexão: " . $conn->connect_error);
}
// Recebe dados do formulário
$email = $_POST['email'] ?? '';
$usuario = $_POST['usuario'] ?? '';
$primeiro_nome = $_POST['primeiro_nome'] ?? '';
$sobrenome = $_POST['sobrenome'] ?? '';
$dia = $_POST['dia'] ?? '';
$mes = $_POST['mes'] ?? '';
$ano = $_POST['ano'] ?? '';
$sexo = $_POST['sexo'] ?? '';
if ($dia && $mes && $ano) {
$aniversario = "$ano-$mes-$dia";
} else {
$aniversario = null;
}
// Prepara e executa o INSERT
$stmt = $conn->prepare("
INSERT INTO usuarios (email, usuario, primeiro_nome, sobrenome, aniversario, sexo)
VALUES (?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("ssssss", $email, $usuario, $primeiro_nome, $sobrenome, $aniversario, $sexo);
if ($stmt->execute()) {
echo "<h2>Cadastro realizado com sucesso!</h2>";
} else {
echo "<h2>Erro ao cadastrar: " . $stmt->error . "</h2>";
}
$stmt->close();
$conn->close();
?>

use cadastro_usuários;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    usuarios VARCHAR(20) NOT NULL, 
    primeiro_nome VARCHAR(30) NOT NULL,
    sobrenome VARCHAR(40) NOT NULL,
    aniversario DATE,
    sexo ENUM('Masculino', 'Feminino', 'Outro',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP          
    )ENGINE=INNODB;