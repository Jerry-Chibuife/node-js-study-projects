const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('-createdAt')
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}

const getJob = async (req, res) => {
    const {userId} = req.user
    const job = await Job.findOne({createdBy:userId, _id:req.params.id})
    if(!job){
        throw new NotFoundError(`No job with ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    const {userId} = req.user
    req.body.createdBy = userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const deleteJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req

    const job = await Job.findOneAndRemove({createdBy:userId, _id:jobId})
    if(!job){
        throw new NotFoundError(`No job with ${jobId}`)
    }
    res.status(StatusCodes.OK).send('Successfully deleted')
}

const editJob = async (req, res) => {
   const {body:{company, position},user:{userId}, params:{id:jobId}} = req

    if(company === '' || position===''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const editedJob = await Job.findOneAndUpdate({createdBy:userId, _id:jobId}, req.body, {new:true, runValidators:true})
    if(!editedJob){
        throw new NotFoundError(`No job with ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({ editedJob })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    editJob
}