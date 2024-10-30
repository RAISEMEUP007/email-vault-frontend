// stores/useFormStore.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define an interface for Billing Info
export interface BillingMethod {
    name: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

// Define an interface for Form Data
export interface FormData {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    password: string;
    referralCode: string;
    billingMethod: BillingMethod;  // Include billing info in FormData
}

export const useFormStore = defineStore('form', () => {
    // Form fields
    const firstName = ref<string>('');
    const lastName = ref<string>('');
    const companyName = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');
    const referralCode = ref<string>('');

    // Billing information fields
    const billingMethod = ref<BillingMethod>({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    // Method to set form data
    const setFormData = (data: FormData) => {
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        companyName.value = data.companyName;
        email.value = data.email;
        password.value = data.password;
        referralCode.value = data.referralCode;
    };

    // Method to set billing information
    const setBillingMethod = (info: BillingMethod) => {
        billingMethod.value = info;
    };

    return {
        firstName,
        lastName,
        companyName,
        email,
        password,
        referralCode,
        billingMethod,
        setFormData,
        setBillingMethod,
    };
});
