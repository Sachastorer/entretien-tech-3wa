import mongoose from 'mongoose'

const CharacterSchema = new mongoose.Schema(
    {
        "name": String
    }
)

const CharacterModel = mongoose.model("characters", CharacterSchema)

export default CharacterModel