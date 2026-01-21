// Google Login Button Handler
        document.getElementById('googleLoginBtn').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Google Login clicked');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            alert('Google Login functionality will be implemented with backend integration.');
        });

        // Login Form Submit Handler
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const emailPhone = document.getElementById('emailPhone').value;
            const password = document.getElementById('password').value;
            
            if (emailPhone && password) {
                console.log('Login attempt:', { emailPhone, password: '***' });
                    window.location.href = "feed.html";
                } else {
                         alert("Please fill all fields");
                }
               }
               );

        // Forgot Password Link Handler
        document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Forgot password clicked');
            alert('Password reset link will be sent to your registered email.');
        });

        // Join Now Link Handler
        document.getElementById('joinNowLink').addEventListener('click', function(e) {
            console.log('Join now clicked');
        });

        // Add smooth transitions to all buttons
        const buttons = document.querySelectorAll('button, .login-btn');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
        });

        // Add focus animation to inputs
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.borderColor = '#2563EB';
                }
            });
        });