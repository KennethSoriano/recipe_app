import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json({message: error});
    }
})

router.post("/", async (req, res) => {
    const recipe = new RecipeModel({
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner
    });
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json({message: error});
    }
});

router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId)
        const user = await UserModel.findById(req.body.userID)
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (error) {
        res.json({message: error});
    }
});

router.get("/savedRecipes/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes: user?.savedRecipes});
    } catch (error) {
        res.json({message: error});
    }
})

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({ _id: { $in: user.savedRecipes } });
        res.json({savedRecipes: user?.savedRecipes});
    } catch (error) {
        res.json({message: error});
    }
})


export {router as recipesRouter};