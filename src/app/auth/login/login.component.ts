export class LoginComponent {

  isRegister = false;
  loading = false;

  error = '';
  success = '';

  // LOGIN
  loginEmail = '';
  loginPassword = '';

  // REGISTER
  registerName = '';
  registerEmail = '';
  registerPassword = '';

  toggleForm(): void {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.success = '';
  }

  login(): void {
    this.loading = true;

    // simulação (substituir pelo Firebase depois)
    setTimeout(() => {
      this.loading = false;

      if (!this.loginEmail || !this.loginPassword) {
        this.error = 'Preencha todos os campos';
        return;
      }

      this.success = 'Login feito com sucesso!';
    }, 1000);
  }

  register(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (!this.registerEmail || !this.registerPassword || !this.registerName) {
        this.error = 'Preencha todos os campos';
        return;
      }

      this.success = 'Conta criada com sucesso!';
      this.isRegister = false;
    }, 1000);
  }

  loginWithGoogle(): void {
    console.log('Google login');
  }
}