function correctFields(schema) {
    // Add a "toJSON" transform function to the schema
    schema.options.toJSON = {
        transform: function (doc, ret) {
            // Remove the specified fields from the JSON representation
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;

            if (ret._id) {
                ret.id = ret._id;
                delete ret._id;
            }
        },
    };
}

module.exports = correctFields