// sourced from: https://github.com/backstage/backstage/blob/39591f4c27862afa45563989d800f9ebeae65adb/packages/catalog-model/src/kinds/ApiEntityV1alpha1.ts
/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Entity } from '@backstage/catalog-model';
import schema from '../schema/kinds/Contact.v1alpha1.schema.json';
import { ajvCompiledJsonSchemaValidator } from './util';

/**
 * Backstage API kind Entity. APIs describe the interfaces for Components to communicate.
 *
 * @remarks
 *
 * See {@link https://backstage.io/docs/features/software-catalog/system-model}
 *
 * @public
 */
export interface ContactEntityV1alpha1 extends Entity {
  apiVersion: 'crm.plugins.backstage.io/v1alpha1';
  kind: 'Contact';
  spec: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

/**
 * {@link KindValidator} for {@link ContactEntityV1alpha1}.
 *
 * @public
 */
export const contactEntityV1alpha1Validator =
  ajvCompiledJsonSchemaValidator(schema);