function selectRole(role) {
            const studentFields = document.getElementById('studentFields');
            const professionalFields = document.getElementById('professionalFields');
            const roleOptions = document.querySelectorAll('.role-option');
            
            roleOptions.forEach(opt => opt.classList.remove('active'));
            
            if (role === 'student') {
                document.getElementById('student').checked = true;
                document.querySelector('[onclick="selectRole(\'student\')"]').classList.add('active');
                studentFields.classList.add('show');
                professionalFields.classList.remove('show');
            } else {
                document.getElementById('professional').checked = true;
                document.querySelector('[onclick="selectRole(\'professional\')"]').classList.add('active');
                professionalFields.classList.add('show');
                studentFields.classList.remove('show');
            }
        }

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const overlay = document.getElementById('overlay');
            const successMessage = document.getElementById('successMessage');
            
            overlay.classList.add('show');
            successMessage.classList.add('show');
            
            setTimeout(() => {
                overlay.classList.remove('show');
                successMessage.classList.remove('show');
            }, 3000);
        });