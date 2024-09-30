const defaultText = document.querySelector('#defaultText');
const calculationsContainer = document.querySelector('#calculationsContainer');

document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected');
        })

        if (this.checked) {
            this.parentElement.classList.add('selected')
        }
    })
})

document.querySelector('#calculate-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('mortgageAmount').value)
    const term = parseFloat(document.getElementById('mortgageTerm').value)
    const rate = parseFloat(document.getElementById('interestRate').value) / 100
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked')    

    let isValid = true;

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    })

    if (isNaN(amount) || amount <= 0) {
        document.querySelector('#amountAlert').style.display = 'block';
        document.querySelector('#mortgageAmountMain').classList.add('error');
        isValid = false
    } else {
        document.querySelector('#amountAlert').style.display = 'none';
    }

    if (isNaN(term) || term <= 0) {
        document.querySelector('#termAlert').style.display = 'block';
        document.querySelector('#mortgageTermMain').classList.add('error');
        isValid = false
    } else {
        document.querySelector('#termAlert').style.display = 'none';
    }

    if (isNaN(rate) || rate <= 0) {
        document.querySelector('#rateAlert').style.display = 'block';
        document.querySelector('#interestRateMain').classList.add('error');
        isValid = false
    } else {
        document.querySelector('#rateAlert').style.display = 'none';
    }

    if (!mortgageType) {
        document.getElementById('typeAlert').style.display = 'block'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error')
        })
        isValid = false
    } else {
        document.getElementById('typeAlert').style.display = 'none'
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.remove('error')
        })
    }

    if (isValid) {
        
        let monthlyPayment = 0;
        let totalRepayment = 0;

        defaultText.classList.add('hide')
        calculationsContainer.classList.add('show')

        if (mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n))
            totalRepayment = monthlyPayment * n
        } else if (mortgageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12
            totalRepayment = monthlyPayment * term * 12
        }

        document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`
        document.getElementById('termResult').innerText = `$${totalRepayment.toFixed(2)}`
    } else {
        document.getElementById('result').innerText = ''
        document.getElementById('termResult').innerText = ''

        defaultText.classList.remove('hide')
        calculationsContainer.classList.remove('show')
    }
})

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('mortgageForm').reset()
    document.getElementById('result').innerText = ''
    document.getElementById('termResult').innerText = ''
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none'
    })

    defaultText.classList.remove('hide')
    calculationsContainer.classList.remove('show')

    document.querySelectorAll('.radio-inputs').forEach(div => {
        div.classList.remove('selected')
    })

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })
})

document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none'
})