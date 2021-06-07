export function extractTransfer(req) {
    if (!req.user) return null;
    // take only needed user fields to avoid sensitive ones (such as password)
    const {
      _id,firstName, lastName, email, password, gender, birth, country, phoneNumber, club
    } = req.user;
    return {
      _id,firstName, lastName, email, password, gender, birth, country, phoneNumber, club
    };
  }