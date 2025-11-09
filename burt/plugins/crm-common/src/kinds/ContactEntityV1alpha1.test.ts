// sourced from: https://github.com/backstage/backstage/blob/39591f4c27862afa45563989d800f9ebeae65adb/packages/catalog-model/src/kinds/ApiEntityV1alpha1.test.ts
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

import {
  ContactEntityV1alpha1,
  contactEntityV1alpha1Validator as validator,
} from './ContactEntityV1alpha1';

describe('ContactV1alpha1Validator', () => {
  let entity: ContactEntityV1alpha1;

  beforeEach(() => {
    entity = {
      apiVersion: 'crm.plugins.backstage.io/v1alpha1',
      kind: 'Contact',
      metadata: {
        name: 'malcolm-reynolds',
      },
      spec: {
        firstName: 'Malcolm',
        lastName: 'Reynolds',
        phone: '1-234-567-8901',
        email: 'mal@serenity.com'
      },
    };
  });

  it('happy path: accepts valid data', async () => {
    await expect(validator.check(entity)).resolves.toBe(true);
  });

  it('ignores unknown apiVersion', async () => {
    (entity as any).apiVersion = 'backstage.io/v1beta0';
    await expect(validator.check(entity)).resolves.toBe(false);
  });

  it('ignores unknown kind', async () => {
    (entity as any).kind = 'Wizard';
    await expect(validator.check(entity)).resolves.toBe(false);
  });

  it('rejects missing firstName', async () => {
    delete (entity as any).spec.firstName;
    await expect(validator.check(entity)).rejects.toThrow(/firstName/);
  });

  it('rejects wrong firstName', async () => {
    (entity as any).spec.firstName = 7;
    await expect(validator.check(entity)).rejects.toThrow(/firstName/);
  });

  it('rejects empty firstName', async () => {
    (entity as any).spec.firstName = '';
    await expect(validator.check(entity)).rejects.toThrow(/firstName/);
  });

  it('accepts missing email', async () => {
    delete (entity as any).spec.email;
    await expect(validator.check(entity)).resolves.toBe(true);
  });

  it('rejects wrong email', async () => {
    (entity as any).spec.email = 7;
    await expect(validator.check(entity)).rejects.toThrow(/email/);
  });

  it('rejects empty email', async () => {
    (entity as any).spec.email = '';
    await expect(validator.check(entity)).rejects.toThrow(/email/);
  });

  it('accepts missing phone', async () => {
    delete (entity as any).spec.phone;
    await expect(validator.check(entity)).resolves.toBe(true);
  });

  it('rejects empty phone', async () => {
    (entity as any).spec.phone = '';
    await expect(validator.check(entity)).rejects.toThrow(/phone/);
  });

  it('rejects additional properties', async () => {
    (entity as any).annotations = 'Test';
    await expect(validator.check(entity)).rejects.toThrow(
      /additional properties/,
    );
  });

  it('rejects with useful error message', async () => {
    (entity as any).annotations = 'Test';
    await expect(validator.check(entity)).rejects.toThrow(/annotations/);
  });
});