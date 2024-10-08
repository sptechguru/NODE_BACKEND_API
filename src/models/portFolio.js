
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const introSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    roles: [String],

    description: {
        type: String,
        required: true
    },

    github: {
        type: String,
        required: true
    },

    resume: {
        type: String,
        required: true
    },

    linkedin: {
        type: String,
        required: true
    },

    twitter: {
        type: String,
        required: true
    },

    insta: {
        type: String,
        required: true
    },

    facebook: {
        type: String,
        required: true
    },
});


const aboutSchema = new Schema({
    profileUrl: {
        type: String,
        required: true
    },

    short_description: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
})



const skillSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    skills: {
        type: Array,
        required: true
    }

});


const experienceSchema = new Schema({
    id: { type: Number, required: true },
    img: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    date: { type: String, required: true },
    desc: { type: String, required: true },
    skills: { type: [String], required: true },
    doc: { type: String, required: true },
});


const educationSchema = new Schema({
    id: { type: Number, required: true },
    img: { type: String, required: true },
    school: { type: String, required: true },
    date: { type: String, required: true },
    grade: { type: String, required: true },
    desc: { type: String, required: true },
    degree: { type: String, required: true },
});



//  Project Schema for 

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    }
});

const projectSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    webapp: {
        type: String,
        required: true
    },
    member: [memberSchema] // Array of members
});



//  All models Exports
experienceSchema

module.exports = {
    Intro: mongoose.model('Intros', introSchema),
    About: mongoose.model('Abouts', aboutSchema),
    Education: mongoose.model('Educations', educationSchema),
    Expereince: mongoose.model('Expereinces', experienceSchema),
    Skill: mongoose.model('Skills', skillSchema),
    Project: mongoose.model('Projects', projectSchema),

}
