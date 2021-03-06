import { ProjectType } from '../../models/ProjectType.js';
import { logger } from '../../helpers/logger.js';

export const createProjectType = async (data) => {
    try {
        const projectType = await ProjectType.findOne({ name: data.name });
        if (projectType) {
            return {
                status: 404,
                code: 'PROJECT_TYPE_EXISTED',
                error: true,
            };
        }
        const newProjectType = await ProjectType.create(data);

        return {
            status: 200,
            code: 'CREATE_NEW_PROJECT_TYPE_SUCCESS',
            error: false,
            data: newProjectType._id,
        };
    } catch (err) {
        logger(`createNewProjectType ${err}`);

        return {
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            error: true,
          };
    }
};

export const getProjectTypeDetail = async (id) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id }, ['_id', 'name', 'description', 'priority', 'status']);
        if (!projectType) {
            return {
                status: 404,
                code: 'PROJECT_TYPE_NOT_EXIST',
                error: true,
            };

        }

        return {
            status: 200,
            code: 'GET_PROJECT_TYPE_DETAIL_SUCCESS',
            error: false,
            data: projectType,
        };
    } catch (err) {
        logger(`getProjectTypeDetail ${err}`);

        return errorResponse;
    }
};

export const updateProjectType = async (id, data) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id });
        if (!projectType) {
            return {
                status: 404,
                code: 'PRODUCT_TYPE_NOT_FOUND',
                error: true,
            };
        }
        await projectType.updateOne(data);

        return {
            status: 200,
            code: 'UPDATE_PROJECT_TYPE_SUCCESS',
            error: false,
            data: data,
        };
    } catch (err) {
        logger(`updateProjectType ${err}`);

        return errorResponse;
    }
};

export const deleteProjectType = async (id) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id });
        if (!projectType) {
            return {
                status: 404,
                code: 'PRODUCT_TYPE_NOT_FOUND',
                error: true,
            };

        }

        await projectType.deleteOne({_id: id});

        return {
            status: 200,
            code: 'DELETE_PROJECT_TYPE_SUCCESS',
            error: false,
        };
    } catch (err) {
        logger(`deleteProjectType ${err}`);

        return errorResponse;
    }
};

export const getListProjectTypes = async (key = '', page = 1, limit = 10, sortBy = 'name', order = 1) => {
    try {
        if (key !== '' && (typeof key !== 'string')) {
            key = key.toString().trim();
        }

        if (Number.isInteger(parseInt(page)) && parseInt(page) > 0) {
            page = parseInt(page);
        } else {
            page = 1;
        }

        if (Number.isInteger(parseInt(limit)) && parseInt(limit) > 0) {
            limit = parseInt(limit);
        } else {
            limit = 10;
        }

        if (['asce', 'ASCE', 'Asce', '1'].includes(order)) {
            sortOrder = 1;
        }

        if (['desc', 'DESC', 'Desc', '-1'].includes(order)) {
            sortOrder = -1;
        }

        sortBy = sortBy.toString().trim();
        if (!['name', 'status'].includes(sortBy)) {
            sortBy = 'name';
        }

        const skipRecord = (page - 1) * limit;
        let regex = `(${key})+`;

        const totalRecords = await ProjectType.countDocuments({ 'name': new RegExp(regex, 'gmi') });
        const projectTypes = await ProjectType.find({ 'name': new RegExp(regex, 'gmi') }, '_id name priority description status')
            .sort([[`${sortBy}`, sortOrder]])
            .skip(skipRecord)
            .limit(limit);

        const totalPage = Math.ceil(totalRecords / limit);

        return {
            status: 200,
            code: 'GET_LIST_PRODUCT_TYPES_SUCCESS',
            error: false,
            message: `Page: ${page}/${totalPage}`,
            data: projectTypes,
        };
    } catch (err) {
        logger(`getListProjectTypes ${err}`);

        return errorResponse;
    }
};