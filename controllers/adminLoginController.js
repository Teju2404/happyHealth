const db = require('../database');

exports.getAdminLogin = (req, res) => {
    res.render('adminViews/adminLogin', {
        layout: 'layouts/mainLayout',
        title: 'admin Login'
    });
};

exports.postAdminLogin = (req, res) => {

    const {
        username,
        password
    } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({
            msg: 'Please enter all fields'
        });
    }

    if (errors.length > 0) {
        res.render('adminViews/adminLogin', {
            layout: 'layouts/mainLayout',
            title: 'admin Login',
            errors,
            username,
            password
        });
    } else {
        const queryString = `SELECT * FROM happyhealth.usertbl WHERE userName = '${username}' and Password = '${password}' and Admin = 'Yes'`;

        db.query(queryString, function (err, result) {
            if (result.length > 0) {
                const userId = result[0]['userId'];
                req.session.userId = userId;
                res.redirect('/adminHome');
                console.log('*****Admin Login successfully*****');
            } else {
                errors.push({
                    msg: 'Enter correct username or password'
                });
                res.render('adminViews/adminLogin', {
                    layout: 'layouts/mainLayout',
                    title: 'admin Login',
                    errors,
                    username,
                    password
                });
            }

        });

    }
};

exports.getAdminHome = (req, res) => {
    const userId = req.session.userId;
    res.render('adminViews/adminHome', {
        layout: 'layouts/adminLayout',
        title: 'admin Home'
    });
};

exports.getUserManagement = (req, res) => {
    const userId = req.session.userId;
    console.log(`User ID: ${userId}`, '--------getUserManagement controller');
    const allUsersQuery = `SELECT * FROM happyhealth.usertbl WHERE userId <> ${userId}`;
    db.query(allUsersQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(`${JSON.stringify(result)}`, '------------db users result');
            res.render('adminViews/userManagement', {
                layout: 'layouts/adminLayout',
                title: 'User Management',
                result
            })
            console.log('****getUserManagement executed successfully****');
        }
    });
};

exports.editUser = (req, res) => {
    const userId = req.params.userId;
    const body = req.body;
    var editQuery = `SELECT * FROM happyhealth.usertbl WHERE UserId = ${userId}`;
    db.query(editQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.render('editProfile', {
                result
            });
            console.log('****editUser executed successfully****');
        }

    });

};

exports.updateUser = (req, res) => {

    console.log(req.body);

    const userId = req.params.userId;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    const updateQuery = `UPDATE happyhealth.usertbl SET Password = '${password}', Email = '${email}', Username = '${userName}' WHERE UserId = ${userId};`;

    db.query(updateQuery, function (err, result) {
        if (err) {
            throw err;
            return;
        }
        res.redirect('../userManagement');
        console.log("****updateUser executed successfully****");

    });


};

exports.deleteUser = (req, res) => {
    console.log("****delete executed started****");
    const userId = req.params.userId;
    console.log(userId);
    const deleteQuery = `Delete FROM happyhealth.USERtbl WHERE UserId = '${userId}'; `;
    const deleteQuery1 = `Delete FROM happyhealth.groupmembertbl WHERE UserId = '${userId}';`;
    const deleteQuery2 = `Delete FROM happyhealth.usermetricstbl WHERE UserId = '${userId}';`;
    db.query(deleteQuery1, function (err) {
        if (err) {
            throw err;
        }
        console.log("****delete1 executed started****");
    });
    db.query(deleteQuery2, function (err) {
        if (err) {
            throw err;
        }
        console.log("****delete2 executed started****");
    });
    db.query(deleteQuery, function (err) {
        if (err) {
            throw err;
        } else {
            res.redirect('/userManagement');
        }
        console.log("****delete executed started****");
    });
};




exports.getAdminAnalytics = (req, res) => {

    res.render('adminViews/adminAnalytics', {
        layout: 'layouts/adminLayout',
        title: 'Admin Analytics'
    });
};

exports.getAdminAnalyticsStep = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsStep', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminAnalyticsSleep = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.sleepHours, usermetricstbl.sleepGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsSleep', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};


exports.getAdminAnalyticsWater = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.water, usermetricstbl.waterGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsWater', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminAnalyticsMeditation = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.meTime, usermetricstbl.meTimeGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsMeditation', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminAnalyticsFruits = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.fruits, usermetricstbl.fruitGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsFruits', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminAnalyticsOverAll = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.stepCount, usermetricstbl.stepGoal, usermetricstbl.sleepHours, usermetricstbl.sleepGoal,
                 usermetricstbl.meTime, usermetricstbl.meTimeGoal, usermetricstbl.water, usermetricstbl.waterGoal,
                 usermetricstbl.veggies, usermetricstbl.veggieGoal, usermetricstbl.fruits, usermetricstbl.fruitGoal 
                 from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsOverAll', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminAnalyticsVegetables = (req, res) => {

    //   var query = `SELECT userId,date,sleepHours,sleepGoal FROM happyhealth.usermetricstbl;`


    var query = `select usertbl.userId, usertbl.fullName, usermetricstbl.date, usermetricstbl.veggies, usermetricstbl.veggieGoal from usertbl inner join usermetricstbl where usertbl.userId =  usermetricstbl.userId;`

    db.query(query, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);

            res.render('adminViews/adminAnalyticsVegetables', {
                layout: 'layouts/adminLayout',
                title: 'Admin Analytics',
                obj: result
            });
        }
    });
};

exports.getAdminUserName = (req, res) => {
    const userId = req.params.userId;

    console.log(`**********  ${userId}   ***********`)

    const query = `SELECT * FROM happyhealth.usertbl where userId = ${userId};`

    db.query(query, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.render('adminViews/adminUserName', {
                layout: 'layouts/adminLayout',
                title: 'User Profile',
                result
            });
            console.log('****getAdminUserName executed successfully****');
        }
    });
};

//     exports.getAdminUserName = (req, res) => {
//         console.log('****getAdminUserName executed successfully****');
//         res.render('adminViews/adminUserName',{layout: 'layouts/adminLayout', title: 'User Profile', result})
//     };

//    };