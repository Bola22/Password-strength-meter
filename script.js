const strenghtMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password-input')
reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {
    const weaknesses = calculatePaswwordStrenght(passwordInput.value)
    let strength = 100
    reasonsContainer.innerHTML = ''
    weaknesses.forEach(weakness => {
        if (weakness == null) return
        strength -= weakness.deduction
        const messageElement = document.createElement('div')
        messageElement.innerText = weakness.message
        reasonsContainer.appendChild(messageElement)
    })
    strenghtMeter.style.setProperty('--strength', strength)
}

function calculatePaswwordStrenght(password) {
    const weaknesses = []
    weaknesses.push(lenghtWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberCaseWeakness(password))
    weaknesses.push(specialCharactersWeakness(password))

    return weaknesses
}
function lenghtWeakness(password) {
    const length = password.length

    if(length <= 5) {
        return {
            message: 'Your password is too short',
            deduction: 40
        }
    }

    if (length <= 10) {
        return {
            message: 'Your password is could be longer',
            deduction: 15
        }
    }
}

function lowerCaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
}

function upperCaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')
}

function numberCaseWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g, 'number characters')
}

function specialCharactersWeakness(password) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
}

function characterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            message: `Your password has no ${type}`,
            deduction: 20
        }
    }

    if (matches.length <= 2) {
        return {
            message: `Your password could use more ${type}`,
            deduction: 5
        }
    }
}




// function lowerCaseWeakness(password) {
//     const matches = password.match(/[a-z]/g) || []

//     if (matches.length === 0) {
//         return {
//             message: 'Your password has no lower case charachters',
//             deduction: 20
//         }
//     }

//     if (matches.length <= 2) {
//         return {
//             message: 'Your password could use more lower case charachters',
//             deduction: 5
//         }
//     }
// }