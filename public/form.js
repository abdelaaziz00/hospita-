function changeStep(direction) {
    const currentForm = steps[currentStep].querySelectorAll('input, select');

    // Validation spécifique pour l'étape 1 (besoins)
    if (currentStep === 0 && direction === 1) {
        const checkedBoxes = Array.from(currentForm).filter(field => field.checked);
        if (checkedBoxes.length === 0) {
            alert("Veuillez sélectionner un besoin avant de continuer.");
            return;
        }
        if (checkedBoxes.length > 1) {
            alert("Vous ne pouvez sélectionner qu'un seul besoin.");
            return;
        }
    }

    // Gestion spéciale pour l'étape 2 (lieu de résidence)
    if (currentStep === 2 && direction === 1) {
        const locationChoice = document.querySelector('input[name="location"]:checked');
        if (!locationChoice) {
            alert("Veuillez sélectionner un lieu de résidence.");
            return;
        }

        // Redirection selon le choix
        if (locationChoice.id === 'morocco') {
            showRegionSelection('morocco');
            return;
        } else if (locationChoice.id === 'europe') {
            showRegionSelection('europe');
            return;
        }
    }

    // Vérification standard de la validité des champs
    for (const field of currentForm) {
        if (!field.checkValidity() && direction === 1) {
            field.reportValidity();
            return;
        }
    }

    // Changer d'étape
    steps[currentStep].classList.remove('active');
    currentStep += direction;
    steps[currentStep].classList.add('active');

    // Mettre à jour les boutons
    document.getElementById('prevBtn').disabled = currentStep === 0;
    document.getElementById('nextBtn').style.display = currentStep === steps.length - 1 ? 'none' : 'inline';
    document.getElementById('submitBtn').style.display = currentStep === steps.length - 1 ? 'inline' : 'none';

    // Si on arrive à la 4ème étape, gérer les choix pour les rendez-vous
    if (currentStep === 3 && direction === 1) {
        const timingChoice = document.querySelector('input[name="timing"]:checked');
        if (!timingChoice) {
            alert("Veuillez sélectionner une option.");
            return;
        }

        if (timingChoice.id === 'quick' || timingChoice.id === 'lessThan2Months') {
            // Ajouter une page pour sélectionner un rendez-vous
            const appointmentPage = `
                <div class="step" id="appointmentStep">
                    <h2>Veuillez sélectionner un rendez-vous :</h2>
                    <div class="choices">
                        <label for="appointmentDate">Sélectionnez une date :</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required>

                        <label for="appointmentTime">Sélectionnez une heure :</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" required>
                    </div>
                    <button type="button" id="confirmAppointmentBtn">Confirmer le rendez-vous</button>
                </div>
            `;

            // Ajouter la page au formulaire
            document.querySelector('#consultationForm').insertAdjacentHTML('beforeend', appointmentPage);

            // Gérer la confirmation du rendez-vous
            document.getElementById('confirmAppointmentBtn').addEventListener('click', () => {
                const appointmentDate = document.getElementById('appointmentDate').value;
                const appointmentTime = document.getElementById('appointmentTime').value;

                if (!appointmentDate || !appointmentTime) {
                    alert("Veuillez sélectionner une date et une heure.");
                    return;
                }

                // supprimer la page de rendez-vous et passer à l'étape suivante
                document.getElementById('appointmentStep').remove();
                steps[currentStep].classList.remove('active');
                currentStep++;
                steps[currentStep].classList.add('active');

                // Mettre à jour les boutons
                document.getElementById('prevBtn').disabled = currentStep === 0;
                document.getElementById('nextBtn').style.display = currentStep === steps.length - 1 ? 'none' : 'inline';
                document.getElementById('submitBtn').style.display = currentStep === steps.length - 1 ? 'inline' : 'none';
            });

            // Masquer les boutons standards
            document.getElementById('prevBtn').disabled = true;
            document.getElementById('nextBtn').style.display = 'none';
            return; // Empêche de continuer normalement tant que le rendez-vous n'est pas validé
        } else if (timingChoice.id === 'moreThan2Months' || timingChoice.id === 'withinAYear') {
            // Passer directement à l'étape suivante
            steps[currentStep].classList.remove('active');
            currentStep++;
            steps[currentStep].classList.add('active');

            // Mettre à jour les boutons
            document.getElementById('prevBtn').disabled = currentStep === 0;
            document.getElementById('nextBtn').style.display = currentStep === steps.length - 1 ? 'none' : 'inline';
            document.getElementById('submitBtn').style.display = currentStep === steps.length - 1 ? 'inline' : 'none';
            return;
        }
    }

    // Si on arrive à la 5ème étape, ajouter la 5ème étape pour email et téléphone
    if (currentStep === 4) {
        const emailPhoneStep = `
            <div class="step" id="emailPhoneStep">
                <h2>Étape 5: Veuillez renseigner votre adresse Mail et votre Téléphone</h2>
                <div class="choices">
                    <label for="email">Adresse Email</label>
                    <input type="email" id="email" name="email" required>

                    <label for="phone">Téléphone</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
            </div>
        `;

        // Ajouter cette nouvelle étape à la fin du formulaire
        document.querySelector('#consultationForm').insertAdjacentHTML('beforeend', emailPhoneStep);
    }
}
