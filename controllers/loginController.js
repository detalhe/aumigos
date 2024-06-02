// controllers/loginController.js

class LoginController {
    exibirFormularioLogin(req, res) {
      res.render('login/login');
    }
  
    async autenticar(req, res) {
      const { email, senha } = req.body;
  
      try {
        const response = await fetch('/usuarios/autenticar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha }),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.tipo === 'administrador') {
            res.redirect('/');
          } else {
            res.render('login/login', { mensagem: 'Acesso não autorizado.' });
          }
        } else {
          res.render('login/login', { mensagem: 'Credenciais inválidas.' });
        }
      } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.render('login/login', { mensagem: 'Erro durante a autenticação.' });
      }
    }
  }
  
  module.exports = LoginController;