export function extractUser(req) {
    if (!req.user) return null;
    // take only needed user fields to avoid sensitive ones (such as password)
    const {
      _id,firstName, lastName, email, gender, birth, country, phoneNumber, club, transfered
    } = req.user;
    return {
      _id,firstName, lastName, email, gender, birth, country, phoneNumber, club, transfered
    };
  }