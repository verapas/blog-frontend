export * from './postController.service';
import { PostControllerService } from './postController.service';
export * from './postEntityController.service';
import { PostEntityControllerService } from './postEntityController.service';
export * from './postPropertyReferenceController.service';
import { PostPropertyReferenceControllerService } from './postPropertyReferenceController.service';
export * from './postSearchController.service';
import { PostSearchControllerService } from './postSearchController.service';
export * from './profileController.service';
import { ProfileControllerService } from './profileController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export * from './userEntityController.service';
import { UserEntityControllerService } from './userEntityController.service';
export * from './userSearchController.service';
import { UserSearchControllerService } from './userSearchController.service';
export const APIS = [PostControllerService, PostEntityControllerService, PostPropertyReferenceControllerService, PostSearchControllerService, ProfileControllerService, UserControllerService, UserEntityControllerService, UserSearchControllerService];
