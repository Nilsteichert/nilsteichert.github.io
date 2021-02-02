<?php

    // Register
    $name_register = $_POST['name'];
    $mail_register = $_POST['newemail'];
    $password_register = $_POST['newpwd'];

    //Login
    $mail_login = $_POST['email'];
    $password_login = $_POST['pwd'];
    

    if (isset($name_register) && isset($mail_register) && isset($password_register)) {
        $db = new PDO('mysql:host=localhost;dbname=nils', 'admin', '***');
        $statement = $db->prepare("INSERT INTO Accounts (Name, Email, Password) VALUES (:name, :mail, :pw)");
        $statement->execute(['name' => $name_register, 'mail' => $mail_register, 'pw' => $password_register]);
        if ($statement->rowCount()) {
            $_SESSION['login'] = "true";
            $_SESSION['name'] = $name;
            echo $name;
        } else {
            echo "fail";
        }
    }

    if (isset($mail_login) && isset($password_login)) {
        $db = new PDO('mysql:host=localhost;dbname=nils', 'admin', '***');
        $statement = $db->prepare("SELECT * FROM Accounts WHERE Email = :email AND Password = :pw");
        $result = $statement->execute(['email' => $mail_login, 'pw' => $password_login]);
        $user = $statement->fetch();
        
        if($user == true) {
            echo 'Hallo username';
        } else {
            echo "Falsche Eingaben";
        }
    }

?>