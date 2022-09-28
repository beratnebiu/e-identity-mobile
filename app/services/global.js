export const documentType = (type) => {
    switch (type) {
        case 'identity_card':
            return 'IDENTITY CARD';
        case 'passport':
            return 'PASSPORT';
        case 'driving_license':
            return 'DRIVING LICENSE';
    }
}

export const applicationStatus = (status) => {
    switch (status) {
        case 0:
            return 'PENDING';
        case 1:
            return 'ACCEPTED';
        case 2:
            return 'REJECTED';
        case 3:
            return 'FINISHED';
    }
}
