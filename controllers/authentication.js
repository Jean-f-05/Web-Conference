module.exports.login = (req,res)=>{
    req.flash("success", "Welcome back!");
    res.redirect("/admins")
};

module.exports.logout = (req,res)=>{
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/webconference")
};