import express from 'express'

export default abstract class SharedRoutesConfig {

  constructor(private _app: express.Application, private _name: string) {
    this.configureRoutes()
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  set app(value: express.Application) {
    this._app = value
  }

  get app(): express.Application {
    return this._app
  }

  abstract configureRoutes(): express.Application
}