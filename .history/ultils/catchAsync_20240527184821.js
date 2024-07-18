module.exports = (fnc) => {
    return (req,res,next) => {
        fnc()
    }
}