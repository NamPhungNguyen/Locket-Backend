
class CreateUserInput {
    /**
     * Email
     * @type {string}
     */
    email;

    constructor({
        email,
    }) {
        this.email = email;
    }

    static fromRequest(request) {
        return new CreateUserInput({
            email: request.email,
        });
    }
}

module.exports = CreateUserInput;

