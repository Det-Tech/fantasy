export function extractUser(req) {
    if (!req.user) return null;
    // take only needed user fields to avoid sensitive ones (such as password)
    const {
      _id,firstName, lastName,publicKey, gender, birth, country, phoneNumber, club, transfered, main, candidate
    } = req.user;
    return {
      _id,firstName, lastName,publicKey, gender, birth, country, phoneNumber, club, transfered, main, candidate
    };
  }